export interface UserProfile {
	clerkId: string;
	name: string;
	lastName?: string;
	phone?: string;
	instagramId?: string;
	photoUrl?: string;
	likes: string[];
	matches: string[];
	createdAt: Date;
	updatedAt: Date;
}
