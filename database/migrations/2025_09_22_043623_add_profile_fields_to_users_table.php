<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('phone')->nullable()->after('email');
        $table->text('address')->nullable()->after('phone');
        $table->string('ktp_path')->nullable()->after('address');
        $table->string('sim_path')->nullable()->after('ktp_path');
        $table->string('verification_status')->default('unverified')->after('sim_path');
    });
}
    public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn(['phone', 'address', 'ktp_path', 'sim_path', 'verification_status']);
    });
}
};
