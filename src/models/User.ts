export interface UserProfile {
	clerkId: string;
	name: string;
	lastName?: string;
	phone?: string;
	instagramId?: string;
	photoUrl?: string;
	likes: string[];
	matches: string[];
	revealedMatches?: string[];
	payments?: Array<{
		matchId: string;
		paymentId: string;
		orderId: string;
		amount: number;
		date: Date;
	}>;
	createdAt: Date;
	updatedAt: Date;
}
