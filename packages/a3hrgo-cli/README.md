# a3hrgo-cli

This command line tool wants to help you to sign in and out at [a3hrgo](https://www.a3hrgo.com/).

## Why do you want this tool?

If you are like, most of the time I forgot about sign in when I arrive at my job and of course I also forget to sing out when I leave the office, I was wondering how I can avoid this and the solution to me is a command line tool.

I can run a command in my console first time in the morning and I cand also run a command at the end of the day (it would be better to automatize it I know, but I have to work on it)

## How to install and use the tool

It's pretty eassy

```shell
npm i -g a3hrgo-cli
```

That's all, now you can configure the client in order to sign.

First thing, you want to know what is your configuration, so let's get it

```shell
a3hrgo-cli config print
```

You get your default configuration, as you can guess, it doesn't have your user and password, in order to add your user, password and default url to sign in

```shell
a3hrgo-cli config save "your ID" "your password" https://a3hrgoapi.herokuapp.com/sign
```

After this and before to sign in, lest check your credentials again

```shell
a3hrgo-cli config print
```

Now you can see your ID and password (don't let any one to see it) Lets go to sign in once for all

```shell
a3hrgo-cli sign
```

Voila, after a few seconds (don't get nervous) you'll get a message which confirms you have sign in
