import sys
import asyncio
import json
from urllib.parse import urljoin
import httpx
from parsel import Selector
from typing_extensions import TypedDict
from collections import defaultdict
import re
from typing import Dict
import re
from datetime import datetime

# Establecer cabeceras HTTP similares a las de un navegador para evitar bloqueos
BASE_HEADERS = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-language": "en-US;en;q=0.9",
    "accept-encoding": "gzip, deflate, br",
}

async def scrape_property(property_id: str) -> Dict:
    """Scrape property details from Idealista.com"""
    async with httpx.AsyncClient(headers=BASE_HEADERS) as session:
        url = f"https://www.idealista.com/inmueble/{property_id}/"
        response = await session.get(url)
        if response.status_code != 200:
            return parse_property_error(response)
        return parse_property(response, property_id)

def parse_property(response: httpx.Response, property_id: str) -> Dict:
    """Parse property details from Idealista.com"""
    selector = Selector(text=response.text)
    css = lambda x: selector.css(x).get("").strip()
    css_all = lambda x: selector.css(x).getall()

    data = {}
    # Meta data
    data["url"] = str(response.url)

    data["id"] = property_id

    # Basic information
    data['title'] = css("h1 .main-info__title-main::text")
    data['location'] = css(".main-info__title-minor::text")
    data['currency'] = css(".info-data-price::text")
    price_text = css(".info-data-price span::text")
    data['price'] = int(''.join(filter(str.isdigit, price_text)))
    data['description'] = "\n".join(css_all("div.comment ::text")).strip()
    data["updated"] = selector.xpath(
        "//p[@class='stats-text']"
        "[contains(text(),'updated on')]/text()"
    ).get("").split(" on ")[-1]

    # Features
    data["features"] = {}
    for feature_block in selector.css(".details-property-h2"):
        label = feature_block.xpath("text()").get()
        features = feature_block.xpath("following-sibling::div[1]//li")
        data["features"][label] = [
            ''.join(feat.xpath(".//text()").getall()).strip()
            for feat in features
        ]

    # Images
    image_data = re.findall(
        "fullScreenGalleryPics\s*:\s*(\[.+?\]),", 
        response.text
    )[0]
    images = json.loads(re.sub(r'(\w+?):([^/])', r'"\1":\2', image_data))
    data['images'] = defaultdict(list)
    data['plans'] = []
    for image in images:
        url = urljoin(str(response.url), image['imageUrl'])
        if image['isPlan']:
            data['plans'].append(url)
        else:
            data['images'][image['tag']].append(url)
    data["status"] = "ok"
    return data

def parse_property_error(response: httpx.Response) -> Dict:
    """Parse property error from Idealista.com"""
    selectorError = Selector(text=response.text)
    cssError = lambda y: selectorError.css(y).get("").strip()

    data = {}
    # Meta data
    data["url"] = str(response.url)

    # Basic information
    idFeature = cssError("p.feature-id::text")
    patron_referencia = r'(\d+)'
    resultado_idFeature = re.search(patron_referencia, idFeature)
    numero_referencia = ''

    if resultado_idFeature:
        numero_referencia = resultado_idFeature.group(1)

    textoFechaBaja = cssError("p.deactivated-detail_date::text")
    patron_fecha = r'(\d{2}/\d{2}/\d{4})'
    resultado_fechaBaja = re.search(patron_fecha, textoFechaBaja)
    fecha_str_seria = ''
    if resultado_fechaBaja:
        fecha_str = resultado_fechaBaja.group(1)
        fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
        fecha_str_seria = fecha.strftime("%d/%m/%Y")

    if numero_referencia.strip() and fecha_str_seria.strip():
        data["status"] = "baja"
        data["id"] = numero_referencia
        data['fechaBaja'] = fecha_str_seria
    else: 
        data["status"] = "error"
    return data

async def run(property_id: str) -> None:
    """Run the scraping process for a single property"""
    property_data = await scrape_property(property_id)
    print(json.dumps(property_data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python idealista_scraper.py <property_id>")
        sys.exit(1)
    asyncio.run(run(sys.argv[1]))
