import {
    pgTable,
    uuid,
    text,
    timestamp,
    boolean,
    pgEnum,
    uniqueIndex,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

/* =========================
   ENUMS
========================= */

export const userRole = pgEnum("user_role", [
    "STUDENT",
    "ADMIN",
])

export const aspirationStatus = pgEnum("aspiration_status", [
    "PENDING",
    "PROCESSING",
    "DONE",
    "REJECTED",
])

/* =========================
   TABLES
========================= */

/* PROFILES */
export const profiles = pgTable("profiles", {
    id: uuid("id").primaryKey(), // references auth.users.id
    name: text("name").notNull(),
    role: userRole("role").notNull().default("STUDENT"),
    classId: uuid("class_id"),
    createdAt: timestamp("created_at").defaultNow(),
})

/* SCHOOL CLASSES */
export const schoolClasses = pgTable("school_classes", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    grade: text("grade").notNull(),
})

/* ASPIRATION CATEGORIES */
export const aspirationCategories = pgTable("aspiration_categories", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
})

/* ASPIRATIONS */
export const aspirations = pgTable("aspirations", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    content: text("content").notNull(),
    categoryId: uuid("category_id"),
    profileId: uuid("profile_id").notNull(),
    classId: uuid("class_id").notNull(),
    status: aspirationStatus("status").default("PENDING"),
    isAnonymous: boolean("is_anonymous").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

/* ASPIRATION LIKES */
export const aspirationLikes = pgTable(
    "aspiration_likes",
    {
        id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
        profileId: uuid("profile_id").notNull(),
        aspirationId: uuid("aspiration_id").notNull(),
        createdAt: timestamp("created_at").defaultNow(),
    },
    (t) => ({
        uniqueLike: uniqueIndex("aspiration_like_unique").on(
            t.profileId,
            t.aspirationId
        ),
    })
)

/* ASPIRATION COMMENTS */
export const aspirationComments = pgTable("aspiration_comments", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    content: text("content").notNull(),
    profileId: uuid("profile_id").notNull(),
    aspirationId: uuid("aspiration_id").notNull(),
    isAnonymous: boolean("is_anonymous").default(false),
    parentCommentId: uuid("parent_comment_id"),
    createdAt: timestamp("created_at").defaultNow(),
})

/* ADMIN RESPONSES */
export const adminResponses = pgTable("admin_responses", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    content: text("content").notNull(),
    aspirationId: uuid("aspiration_id").notNull(),
    profileId: uuid("profile_id").notNull(),
    isPinned: boolean("is_pinned").default(false),
    createdAt: timestamp("created_at").defaultNow(),
})

/* ASPIRATION REPORTS */
export const aspirationReports = pgTable("aspiration_reports", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    reason: text("reason").notNull(),
    aspirationId: uuid("aspiration_id").notNull(),
    profileId: uuid("profile_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})

/* ASPIRATION FLAGS (NLP) */
export const aspirationFlags = pgTable("aspiration_flags", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    aspirationId: uuid("aspiration_id").notNull(),
    spamScore: text("spam_score"),
    toxicityScore: text("toxicity_score"),
    qualityScore: text("quality_score"),
    isFlagged: boolean("is_flagged").default(false),
    flaggedReason: text("flagged_reason"),
    createdAt: timestamp("created_at").defaultNow(),
})
