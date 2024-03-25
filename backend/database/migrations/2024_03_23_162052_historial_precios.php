<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create("historial_precios", function (Blueprint $table) {
            $table->id();
            $table->string('referenciaInmueble');
            $table->decimal("precio", 10, 2)->unsigned();
            $table->date("fechaRegistro");
            $table->timestamps();
            $table->foreign('referenciaInmueble')->references('referencia')->on('inmuebles')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('historial_precios');
    }
};
