import { BlogPost } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface IappProps {
    data: BlogPost
}

export const BlogpostCard = ({ data }: IappProps) => {
    return (
        <div className="group relative overflow-hidden rounded-lg border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
            <Link href={`/post/${data.id}`} className="block w-full h-full">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image src={data?.imageUrl} alt={data.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>

                <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        {data?.title}
                    </h3>

                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                        {data?.content}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="relative size-8 overflow-hidden rounded-full">
                                <Image
                                    src={data?.authorImage}
                                    alt={data.authorName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-sm text-gray-700 font-medium">
                                {data?.authorName}
                            </p>
                        </div>
                        <time className="text-xs text-gray-500">
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(data?.createdAt)}
                        </time>
                    </div>

                </div>

            </Link>
        </div>
    )
}

