import Link from "next/link";

export default function PaginaSobre() {
    return (
        <div>
            <Link href=".." className="nav-button">
                Início
            </Link>
            <h1>Sobre o Projeto</h1>
            <p>
                Esta aplicação foi desenvolvida como parte de um projeto de aprendizado
                intensivo para dominar os fundamentos do desenvolvimento Full-Stack com
                Spring Boot e Next.js.
            </p>
        </div>
    );
}