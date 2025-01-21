import Checkbox from '@/Components/Checkbox';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Todo } from '@/types/model';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import clsx from 'clsx/lite';
import { FormEventHandler, useState } from 'react';

export default function TodosIndex({ todos }: { todos: Todo[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('todos.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Todos</h2>}>
            <Head title="Todo" />
            <div className="pb-6 pt-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('title', e.target.value)}
                            />

                            <InputError message={errors.title} className="mt-2" />

                            <PrimaryButton className="mt-4" disabled={processing}>
                                Add Todo
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {todos.map((todo) => (
                            <TodoItem todo={todo} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const TodoItem = ({ todo }: { todo: Todo }) => {
    const toggleCheckbox: FormEventHandler<HTMLInputElement> = (e) => {
        router.post(route('todos.complete', { id: todo.id }), {
            is_checked: e.currentTarget.checked,
        });
    };

    const deleteItem = (todo: Todo) => () => {
        if (!confirm('Are you sure you want to delete this todo item?')) return;
        router.delete(route('todos.destroy', { id: todo.id }));
    };

    return (
        <div key={todo.id} className="border-b border-gray-100">
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center">
                    <Checkbox defaultChecked={todo.completed_at} onInput={toggleCheckbox} className="mr-4" />
                    <div className={clsx('text-gray-900', todo.completed_at && 'line-through')}>{todo.title}</div>
                </div>
                <div className="flex items-center">
                    <DangerButton onClick={deleteItem(todo)}>Delete Item</DangerButton>
                </div>
            </div>
        </div>
    );
};
