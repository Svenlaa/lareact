import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Secret() {
    return (
        <Authenticated header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Secret Page</h2>}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="mb-2 text-xl font-bold">Congratulations, you found the secret</h1>
                            <p>
                                By visiting this page you have unlocked a the secret badge. You can enable it on{' '}
                                <Link href={route('profile.edit')} className="text-blue-500 hover:text-blue-700">
                                    your profile
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
