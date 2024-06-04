<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create("price_histories", function (Blueprint $table) {
            $table->id();
            $table->bigInteger('property_id_fk');
            $table->decimal("price", 10, 2)->unsigned();
            $table->timestamps();
            $table->foreign('property_id_fk')->references('property_id')->on('properties')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('price_histories');
    }
};
