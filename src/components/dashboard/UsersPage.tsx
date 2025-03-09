import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAlert } from "../../contexts/AlertContext";

type User = {
    id: string;
    email: string;
    role: string;
    is_active: boolean;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    // Fetch users from Supabase
    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("users").select("*");
        if (error) showAlert("error", "Failed to fetch users");
        else setUsers(data);
        setLoading(false);
    };

    // Update User Role
    const updateUserRole = async (id: string, newRole: string) => {
        const { error } = await supabase.from("users").update({ role: newRole }).eq("id", id);
        if (error) showAlert("error", "Failed to update role");
        else {
            showAlert("success", "Role updated successfully");
            fetchUsers();
        }
    };

    // Toggle User Activation
    const toggleUserStatus = async (id: string, isActive: boolean) => {
        const { error } = await supabase.from("users").update({ is_active: !isActive }).eq("id", id);
        if (error) showAlert("error", `Failed to ${isActive ? "deactivate" : "activate"} user`);
        else {
            showAlert("success", `User ${isActive ? "deactivated" : "activated"}`);
            fetchUsers();
        }
    };

    // Delete User
    const deleteUser = async (id: string) => {
        const { error } = await supabase.from("users").delete().eq("id", id);
        if (error) showAlert("error", "Failed to delete user");
        else {
            showAlert("success", "User deleted successfully");
            fetchUsers();
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                User Management
            </h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                                    Email
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                                    Role
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                                    Status
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-200 dark:border-gray-700"
                                >
                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) =>
                                                updateUserRole(user.id, e.target.value)
                                            }
                                            className="p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="staff">Staff</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() =>
                                                toggleUserStatus(user.id, user.is_active)
                                            }
                                            className={`px-3 py-1 rounded-md text-white ${user.is_active
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "bg-red-500 hover:bg-red-600"
                                                }`}
                                        >
                                            {user.is_active ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
