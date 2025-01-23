const UserManagement = () => {
  const users = [
    {
      name: "Oliver Liam",
      role: "Super Admin",
      email: "oll.liam@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "William James",
      role: "Admin",
      email: "wjames@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
    {
      name: "Jackson Logan",
      role: "Admin",
      email: "jacksonl@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "Mason Henry",
      role: "Super Admin",
      email: "masonhendry@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
    {
      name: "Benjamin William",
      role: "Admin",
      email: "benwilliam@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
    {
      name: "Mason Lucas",
      role: "Super Admin",
      email: "lucasmason@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "Noah William",
      role: "User/Agent",
      email: "noahw@gmail.com",
      union: "Drivers Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "James Oliver",
      role: "User/Agent",
      email: "james.oil@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "David Michael",
      role: "User/Agent",
      email: "davidlll@gmail.com",
      union: "Drivers Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "Matthew Taylor",
      role: "Super Admin",
      email: "mataylor@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User & Role Management</h1>
      <div className="mb-4">
        <span className="text-sm">Date Range: 1 Oct - 30 Oct 2024</span>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            All
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded mr-2">
            User/Agent
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded mr-2">Admin</button>
          <button className="bg-gray-200 px-4 py-2 rounded">Super Admin</button>
        </div>
        <div>
          <select className="border p-2 rounded">
            <option>Sort by</option>
            <option>Name</option>
            <option>Role</option>
            <option>Email</option>
          </select>
          <input
            type="text"
            placeholder="Filter"
            className="border p-2 rounded ml-2"
          />
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Union</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                {user.role}
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.union}</td>
              <td className="py-2 px-4 border-b">{user.location}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:text-blue-700">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
