export interface SessionDetails {
	url: string;
	success_url: string;
	cancel_url: string;
}

export interface Session {
	status: string;
	session: SessionDetails;
}