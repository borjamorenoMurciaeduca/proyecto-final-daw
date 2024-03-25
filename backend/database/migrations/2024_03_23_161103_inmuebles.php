<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create("inmuebles", function (Blueprint $table) {
            $table->string('referencia')->unique();
            $table->string("ubicacion");
            $table->integer("tamano")->unsigned();
            $table->integer("habitaciones")->unsigned();
            $table->boolean("garaje");
            $table->boolean("trastero");
            $table->date("fechaBajaAnuncio");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('inmuebles');
    }
};
