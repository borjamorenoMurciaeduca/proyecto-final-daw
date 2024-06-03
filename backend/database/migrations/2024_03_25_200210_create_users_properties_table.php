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
            $table->id();
            $table->unsignedBigInteger('user_id_fk');
            $table->bigInteger('property_id_fk');
            $table->string("title");
            $table->string("location");
            $table->integer("size")->unsigned();
            $table->integer("rooms")->unsigned();
            $table->boolean("garage");
            $table->boolean("storage_room");
            $table->integer("bath_rooms")->unsigned();
            $table->boolean('favorite')->default(false);
            $table->boolean("is_shared")->default(false);
            $table->string("share_url")->nullable();
            $table->longText("description");
            $table->unsignedBigInteger('type_property_fk')->nullable();
            $table->timestamps();
            $table->foreign('type_property_fk')->references('type_properties_id')->on('type_properties')->onDelete('restrict');
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
