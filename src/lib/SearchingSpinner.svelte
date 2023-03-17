<script>
    import Spinner from "./Spinner.svelte";
    const texts = [
  "Searching for the perfect cup of coffee, one that doesn't disappoint.",
  "Searching for the perfect hair day, no frizz, no fuss.",
  "Searching for the perfect Instagram filter, to hide my imperfections.",
  "Searching for the perfect pair of shoes, stylish and comfortable.",
  "Searching for the perfect gift, thoughtful and unique.",
  "Searching for the perfect workout playlist, to keep me motivated.",
  "Searching for the perfect book to read, one that I can't put down.",
  "Searching for the perfect recipe, delicious and easy to make.",
  "Searching for the perfect travel destination, somewhere exotic and adventurous.",
  "Searching for the perfect pet, cute and low-maintenance.",
  "Searching for the day theese texts will be funny XD",
  "Searching for the perfect playlist, to match my mood.",
  "Searching for the perfect pair of jeans, that fit just right.",
  "Searching for the perfect workout, to sculpt my dream body.",
  "Searching for the perfect date night spot, romantic and cozy.",
  "Searching for the perfect career, that I'm passionate about.",
  "Searching for the perfect pizza, with the perfect toppings.",
  "Searching for the perfect binge-worthy TV show, to escape reality.",
  "Searching for the perfect phone case, both stylish and protective.",
  "Searching for the perfect beauty routine, to achieve flawless skin.",
  "Searching for the perfect hobby, to relieve stress and have fun."
    ]
</script>

<Spinner fontsize="1.25em">
    {texts[Math.floor(Math.random()*texts.length)]}
</Spinner>