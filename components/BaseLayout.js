import Header from "./Header";

export default function BaseLayout({ children }) {
	return (
		<div className="mb-4">
			<Header />
			<main>{children}</main>
		</div>
	);
}
