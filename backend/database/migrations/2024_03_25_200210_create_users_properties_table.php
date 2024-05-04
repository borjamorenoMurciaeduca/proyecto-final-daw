<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('users_properties', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id_fk');
            $table->bigInteger('property_id_fk')->unique();
            $table->string("location");
            $table->integer("size")->unsigned();
            $table->integer("rooms")->unsigned();
            $table->boolean("garage");
            $table->boolean("storage_room");
            $table->timestamps();
            $table->foreign('property_id_fk')->references('property_id')->on('properties')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('users_properties');
    }
};
