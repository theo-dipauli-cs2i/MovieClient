import { Navbar } from "./Navbar"
import preactLogo from '../assets/preact.svg';
import viteLogo from '../assets/vite.svg';

export function Home() {
    return (
        <>
            <div class="container">
                <h1 class={"my-3"}>Movie API client</h1>
                <Navbar />
                <div class="row">
                    <div class="col-3 d-flex justify-content-center">
                        <img class="img-fluid w-75" src={preactLogo} alt="" />
                    </div>
                    <div class="col-6">
                        <h1>Movies</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloremque, minima incidunt enim molestias ea earum quidem iusto magnam aut quis illo aliquid vitae repellat? Nam aliquam deleniti expedita consequatur consequuntur eos? Quidem eveniet, atque ipsum vero porro voluptates, inventore fugiat quis officia possimus magnam sit fugit recusandae doloremque veritatis veniam voluptatem quos repellat tempora optio aut id. Voluptatem molestiae aspernatur numquam quas. Voluptatem, tempora. Modi aliquid ut eum perferendis cumque quaerat praesentium magni minima?</p>
                    </div>
                    <div class="col-3 d-flex justify-content-center">
                        <img class="img-fluid w-75" src={viteLogo} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}