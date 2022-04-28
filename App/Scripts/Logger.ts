export class Logger {
	public static Log(...logMessage: string[]): void {
		console.log("[NORDBEAVER TC] // ", ...logMessage);
	}
	
	public static LogError(...logMessage: string[]): void {
		console.error("[NORDBEAVER TC] ❌ // ", ...logMessage);
	}

	public static LogThrow(error: Error): void {
		this.LogError(error.message);
		console.debug(error);
	}
}