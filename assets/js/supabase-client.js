import { createClient } from "@supabase/supabase-js";

const config = {
  url: import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export const supabase = config.url && config.anonKey
  ? createClient(config.url, config.anonKey)
  : null;

export async function fetchProjects(limit) {
  if (!supabase) {
    throw new Error("Supabase configuration is missing.");
  }

  let query = supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchProjectBySlug(slug) {
  if (!supabase) {
    throw new Error("Supabase configuration is missing.");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  return supabase.storage.from("gallery").getPublicUrl(pathOrUrl).data.publicUrl;
}

export async function fetchProjectGallery(project) {
  if (!supabase) {
    throw new Error("Supabase configuration is missing.");
  }

  const { data: files, error: storageError } = await supabase.storage
    .from("gallery")
    .list(project.slug, { limit: 1000 });

  if (!storageError) {
    const imageFiles = (files || [])
      .filter((file) => file.name !== ".keep" && /\.(jpe?g|png|webp|gif)$/i.test(file.name))
      .sort((first, second) => second.name.localeCompare(first.name));

    if (imageFiles.length) {
      return imageFiles.slice(0, 3).map((file) => {
        const path = `${project.slug}/${file.name}`;
        return { id: path, name: file.name, imageUrl: resolveImageUrl(path) };
      });
    }
  }

  const { data: galleryRows, error: galleryError } = await supabase
    .from("project_gallery")
    .select("*")
    .eq("project_id", project.id)
    .order("created_at");

  if (galleryError) {
    console.warn("Project gallery fallback unavailable.", galleryError);
    return [];
  }

  return (galleryRows || []).slice(0, 3).map((item) => ({
    id: item.id,
    name: item.caption || "Project image",
    imageUrl: resolveImageUrl(item.image_url),
  }));
}

export async function fetchSkillsGrouped() {
  if (!supabase) {
    throw new Error("Supabase configuration is missing.");
  }

  const { data: categories, error: categoriesError } = await supabase
    .from("skill_categories")
    .select("*")
    .order("id");

  if (categoriesError) {
    throw categoriesError;
  }

  const { data: skills, error: skillsError } = await supabase
    .from("skills")
    .select("*")
    .order("order_index");

  if (skillsError) {
    throw skillsError;
  }

  return {
    categories: categories || [],
    skills: skills || [],
  };
}