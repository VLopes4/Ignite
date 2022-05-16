import { Container } from "./styles";
import imgIncome from '../../assets/income.svg'
import imgOutcome from '../../assets/outcome.svg'
import imgTotal from '../../assets/total.svg'

export function Summary() {
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={imgIncome} alt="Entradas" />
                </header>
                <strong>R$1000,00</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={imgOutcome} alt="Saídas" />
                </header>
                <strong>- R$500,00</strong>
            </div>
            <div>
                <header>
                    <p>Total</p>
                    <img src={imgTotal} alt="Total" />
                </header>
                <strong>R$500,00</strong>
            </div>
        </Container>
    );
}