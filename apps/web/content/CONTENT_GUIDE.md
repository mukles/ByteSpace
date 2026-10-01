# Content model

Everything the site shows comes from Markdown files in `apps/web/content/`. `src/lib/content.ts` reads them at build time, joins them together and checks that they agree. Shapes are typed in `src/types/content.ts`.

The data is demo data. Courses, creators and reviews are illustrative.

## Collections

| Folder | One file per | Holds |
| --- | --- | --- |
| `courses/` | course | Everything about one course: listing info, price, curriculum, media. The Markdown body is the course description. |
| `creators/` | creator | Profile: name, tagline, role, avatar, follower count. The Markdown body is the bio. |
| `reviews/` | course | Every learner review for that course. |

The file name (without `.md`) is the slug. Slugs are used in URLs (`/courses/<slug>`, `/creators/<slug>`) and for every relation.

## How files link

```text
creators/pixel-and-pine.md
        ▲
        │  creator: "pixel-and-pine"
courses/guitar-foundations.md
        ▲
        │  course: "guitar-foundations"
reviews/guitar-foundations.md
```

- A course names its creator with `creator`.
- A review file names its course with `course`, and must share the course's file name.
- Links point one way only. Never list a creator's courses on the creator, or a course's reviews on the course. Those lists are worked out by the loader.

Pages that feature specific courses list them by slug:

- `pages/course-showcase.md` → `courses` (home page cards and the growth section)
- `auth-showcase.md` → `courses` (login and signup side panel)

## Worked out, never stored

Store the raw facts and let the loader calculate the rest. Typing a number in two places is how they drift apart.

| Shown on the site | Calculated from |
| --- | --- |
| Course rating, review count, star breakdown | the course's `reviews/` file |
| Creator's courses, learners, average rating, categories | courses whose `creator` matches |
| "28 Lessons (3 hours 24 mins)", "17 more videos" | `lessonCount`, `duration`, `featuredLessons` |
| Creator card on a course page | the linked creator file |

## Course fields

Required:

- `title`, `image`, `price`, `duration`
- `category`: one of the 8 categories listed in `pages/courses.md` (Music, Drawing & Painting, Marketing, Animation, Social Media, UI/UX Design, Creative Marketing, Cooking), matching the design.
- `level`: one of the level labels in `pages/courses.md` (`Beginner`, `Intermediate`, `Advanced`).
- `creator`: slug of a file in `creators/`.
- `students`, `lessonCount`: whole numbers.

Optional: `subtitle`, `description` (used for meta tags), `priceSuffix`, `previewVideo`, `featuredLessons`, `modules`, `includes`, `sneakPeek`, `keyPoints`.

When `previewVideo` is empty, a clip from `preview-videos.md` is chosen from the slug, so each course keeps the same clip between builds.

## Review fields

The file has `course` and a `reviews` list. Each review needs `name`, `rating` (1–5), `date` (`"YYYY-MM-DD"`, quoted) and `body`. `role` and `avatar` are optional. Without an avatar the reviewer's initials are shown.

## Creator fields

Required: `name`, `tagline`, `role`, `followers`. Optional: `avatar`. Without one, initials are shown.

## Categories

The category list lives in one place: `categories` in `pages/courses.md`. The category tabs on the home page and on `/courses`, and the category filter, all use this list in this order. Keep it short. Before adding a category, check whether an existing one already fits.

## Shared page copy

Labels that are the same on every course or creator page live once in `pages/`, not in each file:

- `pages/course-details.md`: tab names, headings, button labels and the stat templates (`{rating}`, `{count}`, `{duration}`, `{title}` are filled in per course).
- `pages/creator-profile.md`: badge, follow labels, toolbar icons, empty states.

## Checks

The loader stops the build with a message naming the file when:

- a required field is missing,
- `creator` points to a creator file that doesn't exist,
- `level` isn't one of the allowed labels,
- `category` isn't in the list in `pages/courses.md`,
- a course has no review file, or a review file has no course,
- a review file's `course` doesn't match its file name,
- a showcase lists a course slug that doesn't exist.

## Adding things

- **Course:** add `courses/<slug>.md` and `reviews/<slug>.md` (with `course: "<slug>"`). The course appears in search, on its creator's page and in category filters.
- **Creator:** add `creators/<slug>.md`, then point courses at it with `creator: "<slug>"`.
- **Category:** add it to `categories` in `pages/courses.md`, then use it on courses.
- **Featured course:** add its slug to `pages/course-showcase.md`.
