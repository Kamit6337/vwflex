import queryList from "@api/query/queryList";
import HorizontalSection from "@components/HorizontalSection";

const zIndex = 499;
const MOVIE = "movie";

export const metadata = () => {
  return {
    title: "Movies",
    description: "Show all movies related category",
  };
};

const MoviesPage = () => {
  return (
    <>
      {queryList.map((query, i) => {
        const { id, promise, type, instant, title, trending } = query;

        if (type !== MOVIE) return;

        return (
          <HorizontalSection
            key={id}
            id={id}
            title={title}
            type={type}
            trending={trending}
            promise={promise}
            instant={instant}
            zIndex={zIndex - i * 2}
          />
        );
      })}
    </>
  );
};

export default MoviesPage;
