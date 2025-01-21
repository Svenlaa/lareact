<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    protected $fillable = ['title', 'completed_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function toggleComplete(): void
    {
        $new_value = $this->completed_at ? null : now();
        $this->update(['completed_at' => $new_value]);
    }
}
