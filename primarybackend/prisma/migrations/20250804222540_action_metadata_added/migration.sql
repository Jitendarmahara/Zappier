-- AlterTable
ALTER TABLE "public"."Actions" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
