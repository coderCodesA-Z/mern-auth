const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	if (err.name === "CastError" && err.kind === "ObjectId") {
		return res.status(404).json({ message: "Resource Not Found" });
	}

	res.status(statusCode);
	return res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { errorHandler, notFound };
