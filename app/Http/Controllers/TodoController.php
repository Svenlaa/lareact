<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::query()
            ->orderByRaw('completed_at IS NOT NULL')
            ->orderBy('completed_at')
            ->orderBy('created_at')
            ->get();
        return inertia('Todos/Index', [
            'todos' => $todos,
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
