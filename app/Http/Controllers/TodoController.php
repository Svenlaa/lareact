<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use \Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    private function sortQuery(Builder $query, ?string $sortBy = null) {

        if ($sortBy && count(explode(':', $sortBy)) === 2) {
            $split = explode(':', $sortBy);
            $column = $split[0];
            $direction = $split[1];

            if (in_array($column, ['title', 'completed_at', 'created_at']) && in_array($direction, ['asc', 'desc'])) {
                $query->orderBy($column, $direction);
            }
        }
    }

    public function index(Request $request)
    {
        $orderBy = $request->query('sort', null);
        $query = Todo::query();

        $hasSorted = $query->sort($orderBy);
        if (!$hasSorted) {
            $query->orderByRaw('completed_at IS NOT NULL')
                ->orderBy('completed_at')
                ->orderBy('created_at');
        }

        return inertia('Todos/Index', [
            'todos' => $query->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'string|required',
        ]);

        $request->user()->todos()->create($validated);
    }

    public function complete(Todo $todo, Request $request)
    {
        if ($todo->user_id !== $request->user()->id) {
            abort(403);
        }
        $todo->toggleComplete();
        return;
    }

    public function destroy(Todo $todo, Request $request)
    {
        if ($todo->user_id !== $request->user()->id) {
            abort(403);
        }
        $todo->delete();
        return redirect()->back()->with([
            'message' => "Todo deleted",
        ]);
    }
}
