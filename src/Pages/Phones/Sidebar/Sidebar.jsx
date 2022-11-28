import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const Sidebar = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/productCategory`
      );
      const data = await res.json();

      if (data.success) {
        return data.data;
      } else {
        return [];
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-64 border border-gray-300 rounded-md overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="bg-blue-700 w-full">
        <h2 className="text-xl font-semibold text-white px-5 py-2">
          Filter Ads
        </h2>
      </div>
      <div>
        <h2 className="text-md font-bold text-gray-700 dark:text-gray-200 px-5 py-2">
          Categories
        </h2>

        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

        <div className="px-5 py-2 ml-2">
          <ul>
            {categories?.map((category) => (
              <li key={category?._id}>
                <NavLink
                  to={`/category/${category._id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-bold before:content-['•'] before:mr-1 before:blue-red-500"
                      : "text-gray-700 dark:text-gray-400 font-normal"
                  }
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
