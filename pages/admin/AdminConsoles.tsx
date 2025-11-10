
import React, { useState } from 'react';
import { MOCK_CONSOLES } from '../../constants';
import { Console } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminConsoles: React.FC = () => {
    const [consoles, setConsoles] = useState<Console[]>(MOCK_CONSOLES);

    const toggleAvailability = (consoleId: string) => {
        setConsoles(prev =>
            prev.map(c =>
                c.id === consoleId ? { ...c, isAvailable: !c.isAvailable } : c
            )
        );
    };

    // In a real app, forms for adding/editing would be here.
    // For this demo, we'll just manage availability.

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Consoles</h1>
                <Button>Add New Console</Button>
            </div>
            
            <Card>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consoles.map(consoleItem => (
                                <tr key={consoleItem.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-3 font-semibold">{consoleItem.name}</td>
                                    <td className="p-3">{consoleItem.type}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${consoleItem.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                            {consoleItem.isAvailable ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <Button size="sm" variant="secondary" onClick={() => toggleAvailability(consoleItem.id)}>
                                            Toggle Status
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminConsoles;
