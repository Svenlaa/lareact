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

    public function scopeSort($query, ?string $sortBy = null): bool
    {
        if (!$sortBy) return false;

        $split = explode(':', $sortBy);
        if (count($split) !== 2) return false;
        
        $column = $split[0];
        $direction = $split[1];
        if (!in_array($column, ['title', 'completed_at', 'created_at'])) return false;
        if (!in_array($direction, ['asc', 'desc'])) return false;
        
        $query->orderBy($column, $direction);
        return true;
    }
}
