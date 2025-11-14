import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

export default function AdminMyActivity() {
  const [activities, setActivities] = useState<
    { _id: string; title: string; description: string; imageUrl: string; publicId: string }[]
  >([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Editing state
  const [editing, setEditing] = useState<{
    id: string;
    title: string;
    description: string;
    file: File | null;
  } | null>(null);

  const BASE_URL = "https://manishasrivastav-production.up.railway.app/api/my-activity";

  // 🧾 Fetch all activities
  const fetchActivities = async () => {
    setFetching(true);
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      if (data.success) setActivities(data.data);
      else console.error("Fetch error:", data.message);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // 📤 Upload new activity
  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image");
    if (!title.trim()) return toast.error("Please enter a title");
    if (!description.trim()) return toast.error("Please enter a description");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", description);

      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Upload failed");
      } else {
        toast.success("Activity uploaded successfully!");
        await fetchActivities();
        setFile(null);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 📝 Edit activity
  const handleEdit = async () => {
    if (!editing) return;
    if (!editing.title.trim() || !editing.description.trim())
      return toast.error("Title and description are required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", editing.title);
      formData.append("description", editing.description);
      if (editing.file) formData.append("image", editing.file);

      const res = await fetch(`${BASE_URL}/${editing.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Update failed");
      } else {
        toast.success("Activity updated successfully!");
        setEditing(null);
        await fetchActivities();
      }
    } catch (error) {
      console.error("Edit error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete activity
  const handleDelete = async (publicId: string) => {
    if (!window.confirm("Delete this activity?")) return;

    try {
      const res = await fetch(`${BASE_URL}/${publicId}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Delete failed");
      } else {
        toast.success("Activity deleted successfully");
        await fetchActivities();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-[#0d1117] text-white py-10 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        Manage My Activity
      </h1>

      {/* Upload Section */}
      <div className="flex flex-col gap-3 mb-10 bg-[#111827] p-6 rounded-lg border border-gray-700 shadow-lg w-full max-w-2xl">
        <Input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 border-gray-600"
        />
        <Textarea
          placeholder="Enter description (max 5000 chars)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 border-gray-600 h-32 resize-none"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm text-gray-300 border-none"
        />
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {/* Gallery Section */}
      {fetching ? (
        <p className="text-gray-400">Loading activities...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500 mt-10">No activities uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {activities.map((act) => (
            <Card
              key={act._id}
              className="bg-[#111827] border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-yellow-400/20 transition relative"
            >
              <CardContent className="p-0 relative">
                <img
                  src={act.imageUrl}
                  alt={act.title}
                  className="object-cover w-full h-64"
                />
                <div className="p-3">
                  <h3 className="text-yellow-400 font-semibold text-lg mb-1">
                    {act.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {act.description}
                  </p>
                </div>

                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    onClick={() =>
                      setEditing({
                        id: act._id,
                        title: act.title,
                        description: act.description,
                        file: null,
                      })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(act.publicId)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#1f2937] p-6 rounded-lg w-full max-w-md border border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              Edit Activity
            </h2>
            <Input
              type="text"
              value={editing.title}
              onChange={(e) =>
                setEditing((prev) => prev && { ...prev, title: e.target.value })
              }
              className="bg-gray-800 text-white mb-3"
            />
            <Textarea
              value={editing.description}
              onChange={(e) =>
                setEditing(
                  (prev) => prev && { ...prev, description: e.target.value }
                )
              }
              className="bg-gray-800 text-white h-32 resize-none mb-3"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditing(
                  (prev) => prev && { ...prev, file: e.target.files?.[0] || null }
                )
              }
              className="text-sm text-gray-300 mb-4"
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setEditing(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEdit}
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
