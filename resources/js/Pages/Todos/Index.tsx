import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Todo } from '@/types/model';
import { Head, useForm, usePage } from '@inertiajs/react';
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
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
                        </form>
                    </div>
                </div>
            </div>

            <div className="py-12">
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
    const props = usePage().props;
    const [checked, setChecked] = useState(todo.completed_at);

    const toggleCheckbox: FormEventHandler<HTMLInputElement> = (e) => {
        setChecked(e.currentTarget.checked);
        fetch(route('todos.complete', { id: todo.id }), {
            body: JSON.stringify({
                _token: props.csrf_token,
                is_checked: checked,
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <div key={todo.id} className="border-b border-gray-100">
            <div className="flex justify-between items-center p-6">
                <div className="flex items-center">
                    <div className={clsx('text-gray-900', checked && 'line-through')}>{todo.title}</div>
                </div>
                <div className="flex items-center">
                    <Checkbox defaultChecked={todo.completed_at} onInput={toggleCheckbox} />
                </div>
            </div>
        </div>
    );
};
