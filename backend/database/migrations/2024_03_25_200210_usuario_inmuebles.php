<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('usuario_inmuebles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId');
            $table->bigInteger('referenciaInmueble');
            $table->string("ubicacion");
            $table->integer("tamano")->unsigned();
            $table->integer("habitaciones")->unsigned();
            $table->boolean("garaje");
            $table->boolean("trastero");
            $table->timestamps();
            $table->foreign('referenciaInmueble')->references('referencia')->on('inmuebles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('usuario_inmueble');
    }
};
