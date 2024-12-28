import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import FavoritePropertiesSkeleton from "@/components/FavoritesPage/FavoritePropertiesSkeleton";
import FavoriteProperties from "@/components/FavoritesPage/FavoriteProperties";

export const metadata = {
  title: "Favorite Properties | Keyspace",
  description: "View and manage your favorite properties on Keyspace.",
};

export default async function FavoritesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: favoriteProperties, error } = await supabase
    .from("favorites")
    .select("productId")
    .eq("userId", user.id);

  if (error) {
    console.error("Error fetching favorite properties:", error);
  }

  const favoritePropertyIds =
    favoriteProperties?.map((fav) => fav.productId) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-14 font-urbanist">
      <h1 className="text-3xl font-bold my-8 text-space-blacks">Your Favorite Properties</h1>
      <Suspense fallback={<FavoritePropertiesSkeleton />}>
        <FavoriteProperties favoritePropertyIds={favoritePropertyIds} />
      </Suspense>
    </div>
  );
}
