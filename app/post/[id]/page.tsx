import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
type Params = Promise<{ id: string }>

async function getData(id: string) {
    const data = prisma.blogPost.findUnique({
        where: {
            id
        }
    })


    return data;
}


export default async function BlogPage({ params }: { params: Params }) {
    const { id } = await params;
    const data = await getData(id);
    if (!data) {
        return notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Link href="/" className={buttonVariants({ variant: 'secondary' })}>Back to Posts</Link>
            <div className="mb-8 mt-6 ">
                <h1 className="text-3xl font-black tracking-tight mb-4">
                    {data?.title}
                </h1>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="relative size-10 overflow-hidden rounded-full">
                            <Image fill src={data?.authorImage} alt={data.authorName} className="object-cover" />
                        </div>
                        <p className="font-medium">{data?.authorName}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(data?.createdAt)}
                    </p>
                </div>
            </div>
            <div className="relative h-[400px] overflow-hidden w-full mb-8 rounded-lg">
                <Image fill src={data?.imageUrl} alt={data.title} className="object-cover" />
            </div>

            <Card>
                <CardContent>
                    <p className="text-gray-700">
                        {data?.content}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}