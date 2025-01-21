<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::query()->orderBy('completed_at')->get();
        return inertia('Todos/Index', [
            'todos' => $todos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
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
    public function destroy(Todo $todo)
    {
        $todo->delete();
    }
}
