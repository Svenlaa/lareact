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
        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('badge_unlocked_at')->nullable()->after('email_verified_at');
            $table->boolean('is_badge_enabled')->default(false)->after('badge_unlocked_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('badge_unlocked_at');
            $table->dropColumn('is_badge_enabled');
        });
    }
};
