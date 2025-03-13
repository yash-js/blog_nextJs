import { BlogpostCard } from "@/components/general/BlogpostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

async function getData(userId: string) {

    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return data;
}

export default async function Page() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await getData(user?.id);
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Your Blogs!</h2>
                <Link href="/dashboard/create" className={buttonVariants()}>
                    Create Post
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((post) => (
                   <BlogpostCard key={post.id} data={post}/>
                ))}
            </div>
        </div>
    );
}