import { connect } from "@utils/db";

export const GET = async (req, { params }) => {
  const database = await connect();

  if (database) {
    try {
      const { search } = params;

      const data = await database.collection
        .find({
        
        })
        .toArray();

      return new Response(JSON.stringify(data), {
        status: 200,
      });
    } catch (error) {
      return new Response("Failed to Fetch Data from DB", { status: 500 });
    }
  }
  return new Response("failed to connect to db");
};
