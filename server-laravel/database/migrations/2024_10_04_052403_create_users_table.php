<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 100); // full_name with a max of 100 characters
            $table->enum('role', ['admin', 'level1', 'level2']); // role limited to admin, level1, and level2
            $table->string('email')->unique(); // email must be unique
            $table->string('phone_number')->unique(); // phone number must be unique
            $table->string('username')->unique(); // username must be unique
            $table->string('password'); // password field
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
