<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'incident_date',
        'location',
        'evidence',
        'contact',
        'user_id'
    ];  

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
