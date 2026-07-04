import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

export default function AdminUsersPage() {

	const [users, setUsers] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);

//     const sampleUsers = [
//   {
//     _id: "1",
//     name: "John Smith",
//     email: "john.smith@gmail.com",
//     role: "admin",
//     isBlocked: false,
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     _id: "2",
//     name: "Emma Wilson",
//     email: "emma.wilson@gmail.com",
//     role: "customer",
//     isBlocked: false,
//     image: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
//   {
//     _id: "3",
//     name: "Michael Brown",
//     email: "michael.brown@gmail.com",
//     role: "customer",
//     isBlocked: true,
//     image: "https://randomuser.me/api/portraits/men/3.jpg",
//   },
//   {
//     _id: "4",
//     name: "Sophia Johnson",
//     email: "sophia.johnson@gmail.com",
//     role: "customer",
//     isBlocked: false,
//     image: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
//   {
//     _id: "5",
//     name: "David Lee",
//     email: "david.lee@gmail.com",
//     role: "admin",
//     isBlocked: false,
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//   },
//   {
//     _id: "6",
//     name: "Olivia Taylor",
//     email: "olivia.taylor@gmail.com",
//     role: "customer",
//     isBlocked: true,
//     image: "https://randomuser.me/api/portraits/women/6.jpg",
//   },
//   {
//     _id: "7",
//     name: "Daniel White",
//     email: "daniel.white@gmail.com",
//     role: "customer",
//     isBlocked: false,
//     image: "https://randomuser.me/api/portraits/men/7.jpg",
//   },
//   {
//     _id: "8",
//     name: "Charlotte Hall",
//     email: "charlotte.hall@gmail.com",
//     role: "customer",
//     isBlocked: false,
//     image: "https://randomuser.me/api/portraits/women/8.jpg",
//   },
//   {
//     _id: "9",
//     name: "James Martin",
//     email: "james.martin@gmail.com",
//     role: "customer",
//     isBlocked: true,
//     image: "https://randomuser.me/api/portraits/men/9.jpg",
//   },
//   {
//     _id: "10",
//     name: "Amelia Moore",
//     email: "amelia.moore@gmail.com",
//     role: "admin",
//     isBlocked: false,
//     image: "https://randomuser.me/api/portraits/women/10.jpg",
//   },
// ];

	useEffect(() => {

		if (loading) {

			const token = localStorage.getItem("token");

			axios
				.get(
					import.meta.env.VITE_BASE_URL +
						"/users/all/" +
						pageSize +
						"/" +
						pageNumber,
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					},
				)
				.then((response) => {

					setUsers(response.data.users);
					setTotalPages(response.data.totalPages);
					setLoading(false);

				})
				.catch(() => {

					toast.error("Failed to fetch users");
                    //setUsers(sampleUsers);
					setLoading(false);

				});
		}

	}, [loading, pageNumber, pageSize]);

	return (

		<div className="w-full h-full overflow-y-auto relative bg-app-cream">

			{/* HEADER */}
			<div className="flex items-center justify-between gap-3 px-8 pt-8 pb-5">

				<div>

					<p className="text-xs font-semibold tracking-[0.2em] text-app-orange uppercase mb-1">
						Accounts
					</p>

					<h2 className="text-2xl font-semibold text-app-green">
						Users
					</h2>

				</div>

				{!loading && (
					<div className="hidden sm:flex items-center gap-2 bg-white border border-app-border rounded-full px-4 py-2 shadow-sm">
						<span className="w-2 h-2 rounded-full bg-app-success"></span>
						<span className="text-sm text-app-text-light">{users.length} on this page</span>
					</div>
				)}

			</div>

			<div className="w-full px-8 pb-28">
			  <div className="w-full bg-white rounded-2xl shadow-lg shadow-app-green/5 border border-app-border overflow-hidden">

			{/* LOADING */}
			{
				loading ? (

					<div className="w-full py-24 flex justify-center items-center">
						<Loading />
					</div>

				) : users.length === 0 ? (

					<div className="w-full py-24 flex flex-col justify-center items-center text-center">
						<p className="text-lg font-medium text-app-green">No users found</p>
						<p className="text-sm text-app-text-light mt-1">Users will show up here once they sign up.</p>
					</div>

				) : (

					<div className="overflow-x-auto">
					<table className="min-w-[1100px] w-full text-sm relative">

						<thead>

							<tr className="bg-app-green text-app-cream">

								<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                                    Profile
                                </th>

								<th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
									Email
								</th>

								<th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
									Name
								</th>

								<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
									Role
								</th>

								<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
									Status
								</th>

								<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
									Block User
								</th>

								<th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
									Change Role
								</th>

							</tr>

						</thead>

						<tbody className="text-app-text divide-y divide-app-border">

							{
								users.map((user) => (

									<tr
										key={user.email}
										className="odd:bg-app-cream/40 hover:bg-app-orange/5 transition-colors"
									>

										<td className="px-5 py-3 text-center">

											<img
												referrerPolicy="no-referrer"
												src={user.image}
												className="w-11 h-11 object-cover rounded-full mx-auto border-2 border-app-border"
											/>

										</td>

										<td className="px-5 py-3 text-left text-app-text-light whitespace-nowrap">
											{user.email}
										</td>

										<td className="px-5 py-3 text-left font-medium text-app-green whitespace-nowrap">
											{user.name}
										</td>

										<td className="px-5 py-3 text-center whitespace-nowrap">
											<span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
												user.role === "admin"
													? "bg-app-orange/15 text-app-orange-dark"
													: "bg-app-green-lighter/10 text-app-green-light"
											}`}>
												{user.role}
											</span>
										</td>

										<td className="px-5 py-3 text-center whitespace-nowrap">

											<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
												user.isBlocked
													? "bg-app-error/10 text-app-error"
													: "bg-app-success/10 text-app-success"
											}`}>
												<span className={`w-1.5 h-1.5 rounded-full ${
													user.isBlocked ? "bg-app-error" : "bg-app-success"
												}`}></span>
												{
													user.isBlocked
														? "Blocked"
														: "Active"
												}
											</span>

										</td>

										<td className="px-5 py-3 text-center whitespace-nowrap">

											<button
												className={`px-4 py-1.5 rounded-full text-white text-xs font-semibold transition-colors cursor-pointer ${
													user.isBlocked
														? "bg-app-success hover:bg-app-success/80"
														: "bg-app-error hover:bg-app-error/80"
												}`}
												onClick={() => {

													axios
														.post(
															import.meta.env.BASE_API_URL +
																"/users/toggle-block",
															{
																email: user.email,
															},
															{
																headers: {
																	Authorization:
																		"Bearer " +
																		localStorage.getItem(
																			"token",
																		),
																},
															},
														)
														.then((response) => {

															toast.success(
																response.data.message,
															);

															setLoading(true);

														})
														.catch((err) => {

															toast.error(
																err?.response?.data
																	?.message ||
																	"Failed to toggle block status",
															);

														});

												}}
											>

												{
													user.isBlocked
														? "Unblock"
														: "Block"
												}

											</button>

										</td>

										<td className="px-5 py-3 text-center whitespace-nowrap">

											<button
												className={`px-4 py-1.5 rounded-full text-white text-xs font-semibold transition-colors cursor-pointer ${
													user.role === "admin"
														? "bg-app-text-light hover:bg-app-text-light/80"
														: "bg-app-orange hover:bg-app-orange-dark"
												}`}
												onClick={() => {

													axios
														.post(
															import.meta.env.BASE_API_URL +
																"/users/toggle-role",
															{
																email: user.email,
															},
															{
																headers: {
																	Authorization:
																		"Bearer " +
																		localStorage.getItem(
																			"token",
																		),
																},
															},
														)
														.then((response) => {

															toast.success(
																response.data.message,
															);

															setLoading(true);

														})
														.catch((err) => {

															toast.error(
																err?.response?.data
																	?.message ||
																	"Failed to toggle role",
															);

														});

												}}
											>

												{
													user.role === "admin"
														? "Make Customer"
														: "Make Admin"
												}

											</button>

										</td>

									</tr>

								))
							}

						</tbody>

					</table>
					</div>

				)
			}

			</div>
			</div>

			{/* PAGINATION */}
			<div className="absolute bottom-6 left-0 w-full h-[56px] flex justify-center items-center px-4 pointer-events-none">

				<div className="w-full max-w-[520px] h-full bg-white shadow-xl shadow-app-green/10 border border-app-border rounded-full flex items-center justify-center px-2 gap-1 pointer-events-auto">

					<button
						className="bg-app-orange w-[100px] text-white text-sm font-semibold py-2 rounded-full cursor-pointer hover:bg-app-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						disabled={pageNumber <= 1}
						onClick={() => {

							if (pageNumber > 1) {

								setPageNumber(pageNumber - 1);
								setLoading(true);

							} else {

								toast.success(
									"You are on the first page",
								);

							}

						}}
					>

						Previous

					</button>

					<span className="text-sm text-app-text w-[100px] text-center">

						Page {pageNumber} of {totalPages}

					</span>

					<button
						className="bg-app-orange text-white text-sm font-semibold py-2 rounded-full w-[100px] cursor-pointer hover:bg-app-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						disabled={pageNumber >= totalPages}
						onClick={() => {

							if (pageNumber < totalPages) {

								setPageNumber(pageNumber + 1);
								setLoading(true);

							} else {

								toast.success(
									"You are on the last page",
								);

							}

						}}
					>

						Next

					</button>

					<select
						value={pageSize}
						onChange={(e) => {

							setPageSize(parseInt(e.target.value));
							setLoading(true);

						}}
						className="ml-3 border border-app-border rounded-full px-3 py-2 text-sm text-app-text bg-app-cream/60 focus:outline-none focus:ring-2 focus:ring-app-orange/30 cursor-pointer"
					>

						<option value={10}>10 per page</option>
						<option value={20}>20 per page</option>
						<option value={50}>50 per page</option>

					</select>

				</div>

			</div>

		</div>
	);
}