import { BookOpen } from "lucide-react";

export default function Publications() {
    const publications = [
        {
            title: "From Mindless Scrolling to Meaningful Conversations: A New Paradigm in Social Networking",
            journal: "Zenodo",
            year: 2025,
            doi: "https://doi.org/10.5281/zenodo.15104278"
        }
    ];

    return (
        <div className="w-full py-40 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl w-full font-bold text-gray-800 mb-6 text-center">Publications</h2>
                <div className="flex flex-row justify-center items-center">
                    {publications.map((pub, index) => (
                        <div key={index} className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md flex items-center justify-center gap-2 w-full">
                            <div>
                                
                                <h3 className="text-lg font-semibold text-gray-900">{pub.title}</h3>
                                <p className="text-gray-600 text-sm">{pub.journal}, {pub.year}</p>
                                <a
                                    href={pub.doi}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 text-blue-500 hover:underline text-sm block"
                                >
                                    View Publication
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}