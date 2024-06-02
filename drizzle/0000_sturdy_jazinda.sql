CREATE TABLE `documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`status` text NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
