<?php

namespace Database\Factories;

use App\Models\Properties;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inmueble>
 */
class PropertyFactory extends Factory {

    protected $model = Property::class;
    public function definition(): array {
        $images_urls = [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FzYXN8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FzYXN8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FzYXN8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1430285561322-7808604715df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1619216083420-6e54b895f730?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1588012886079-baef0ac45fbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1598714805247-5dd440d87124?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1543071293-d91175a68672?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1602523498681-d825dcdabcaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1558905892-2552d474f859?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGNhc2FzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxjYXNhc3xlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1609948368716-254e2501d243?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxjYXNhc3xlbnwwfHwwfHx8MA%3D%3D'
        ];
        return [
            'property_id' => $this->faker->unique()->randomNumber(9),
            'cancellation_date' => null,
            'url_image' =>  $this->faker->randomElement($images_urls),
        ];
    }
}
