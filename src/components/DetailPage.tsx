import { useEffect, useState } from "react";

import { Calendar } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLocation } from "react-router-dom";
export default function DetailPage() {
 const location = useLocation();
const query = new URLSearchParams(location.search);

const id = query.get("id");
const type = query.get("type");


  const [data, setData] = useState<any>(null);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
console.log("DetailPage params:", { id, type });
  const POST_API = "https://manishasrivastav-production.up.railway.app/api/posts";
  const ACTIVITY_API = "http://localhost:8080/api/my-activity";

  // ⭐ Fetch Single & All Items
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Fetch all items
        const allRes = await fetch(type === "post" ? POST_API : ACTIVITY_API);
        const allJson = await allRes.json();
        
        if (type === "post") setAllItems(allJson);
        else setAllItems(allJson.data);

        // Fetch single
        const singleRes = await fetch(
          type === "post" ? `${POST_API}/${id}` : `${ACTIVITY_API}/${id}`
        );
        const singleJson = await singleRes.json();
        setData(type === "post" ? singleJson : singleJson.data);

      } catch (error) {
        console.error("Error loading:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, type]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-300">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-300">
        Not found
      </div>
    );
  }

  const bannerImage = data.imageUrl || data.image;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* ⬆ TOP IMAGE */}
      {bannerImage && (
        <div className="w-full h-[380px]">
          <img
            src={bannerImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <h1 className="text-4xl font-bold text-amber-300 mb-3">
          {data.title}
        </h1>

        {data.date && (
          <div className="flex items-center text-gray-400 mb-6">
            <Calendar className="w-5 h-5 mr-2" />
            {new Date(data.date).toLocaleDateString()}
          </div>
        )}

        <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg mb-16">
          {data.content || data.description}
        </p>

        {/* ⬇ MORE ITEMS LIST */}
        <h2 className="text-3xl font-semibold text-amber-300 mb-6">
          More {type === "post" ? "Posts" : "Activities"}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {allItems
            .filter((item) => item._id !== id)
            .slice(0, 6)
            .map((item) => (
              <Card
                key={item._id}
               
                className="bg-[#1f2937] border border-gray-700 rounded-xl cursor-pointer hover:scale-105 transition p-0"
              >
                <CardContent className="p-0">
                  <img
                    src={item.imageUrl || item.image}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-3">
                    <h3 className="text-sm text-amber-300 font-semibold truncate">
                      {item.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
