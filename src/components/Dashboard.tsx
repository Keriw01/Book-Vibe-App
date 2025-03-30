import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  imageUrl?: string;
}

const sampleBooks: Book[] = [
  {
    id: 1,
    title: 'Wiedźmin: Ostatnie życzenie',
    author: 'Andrzej Sapkowski',
    isbn: '978-8375780635',
    description: 'Pierwszy zbiór opowiadań o wiedźminie Geralcie z Rivii, wprowadzający czytelnika w mroczny świat pełen potworów i moralnych dylematów.',
    imageUrl: 'https://placehold.co/600x400/EEE/31343C?text=Okładka+Wiedźmina'
  },
  {
    id: 2,
    title: 'Lalka',
    author: 'Bolesław Prus',
    isbn: '978-8377791778',
    description: 'Jedna z najważniejszych polskich powieści realistycznych, ukazująca panoramę społeczeństwa Warszawy końca XIX wieku przez pryzmat losów Stanisława Wokulskiego.',
    imageUrl: 'https://placehold.co/600x400/DDD/31343C?text=Okładka+Lalki'
  },
  {
    id: 3,
    title: 'Solaris',
    author: 'Stanisław Lem',
    isbn: '978-8308049218',
    description: 'Klasyka literatury science fiction. Opowieść o ludzkich próbach zrozumienia obcej, inteligentnej formy życia – oceanu na planecie Solaris.',
    imageUrl: 'https://placehold.co/600x400/CCC/31343C?text=Okładka+Solaris'
  },
  {
    id: 4,
    title: 'Pan Tadeusz',
    author: 'Adam Mickiewicz',
    isbn: '978-8373271808',
    description: 'Polska epopeja narodowa, opisująca życie szlachty na Litwie na początku XIX wieku, z wątkiem miłosnym i historycznym w tle.',
    imageUrl: 'https://placehold.co/600x400/BBB/31343C?text=Okładka+Pana+Tadeusza'
  }
];

function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
      
        // const response = await fetch('/api/books');
        // if (!response.ok) throw new Error('Błąd podczas pobierania danych');
        // const data: Book[] = await response.json();
        
        setBooks(sampleBooks);
        setLoading(false);
      } catch (err) {
        setError('Wystąpił błąd podczas ładowania książek');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  if (error) {
    return (
      <MDBContainer className="my-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">Katalog Książek</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Ładowanie...</span>
          </div>
          <p className="mt-2">Ładowanie książek...</p>
        </div>
      ) : books.length > 0 ? (
        <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {books.map((book) => (
            <MDBCol key={book.id}>
              <MDBCard className="h-100 shadow-sm">
                {book.imageUrl && (
                  <MDBCardImage
                    src={book.imageUrl}
                    alt={`Okładka książki ${book.title}`}
                    position="top"
                    style={{ aspectRatio: '3 / 2', objectFit: 'cover' }}
                  />
                )}
                <MDBCardBody className="d-flex flex-column">
                  <MDBCardTitle>{book.title}</MDBCardTitle>
                  <MDBCardText>
                    <strong>Autor:</strong> {book.author}
                  </MDBCardText>
                  <MDBCardText>
                    <strong>ISBN:</strong> {book.isbn}
                  </MDBCardText>
                  <MDBCardText className="text-muted small">
                    {book.description.length > 100 
                      ? `${book.description.substring(0, 97)}...` 
                      : book.description}
                  </MDBCardText>
                  <MDBBtn href={`/book/${book.id}`} className="mt-auto align-self-start">
                    Szczegóły
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <p className="text-center">Brak książek do wyświetlenia.</p>
      )}
    </MDBContainer>
  );
}

export default Dashboard;