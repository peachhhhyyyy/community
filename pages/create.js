import BaseLayout from "../components/BaseLayout";
import PostForm from "../components/PostForm";

export default function Create() {
	return (
		<BaseLayout>
			<PostForm
				mode={"create"}
				initialValues={{ subject: "", content: "" }}
			>
				<h1 className="text-2xl font-bold my-4">글쓰기</h1>
			</PostForm>
		</BaseLayout>
	);
}
