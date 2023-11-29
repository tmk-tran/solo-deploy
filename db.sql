--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    user_id integer,
    game_date date,
    game_notes character varying,
    total_game_score integer,
    target_name character varying,
    target_score_value integer
);


--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: rounds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rounds (
    round_id integer NOT NULL,
    game_id integer,
    round_number integer,
    round_score integer
);


--
-- Name: rounds_round_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rounds_round_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rounds_round_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rounds_round_id_seq OWNED BY public.rounds.round_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL,
    profile_picture character varying(200)
);


--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: rounds round_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rounds ALTER COLUMN round_id SET DEFAULT nextval('public.rounds_round_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (131, 1, '2023-10-27', 'Notes', 110, 'Bullseye Only', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (132, 1, '2023-10-27', 'Notes', 190, '3-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (258, 1, '2023-11-28', 'Notes', 420, '3-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (225, 1, '2023-10-29', 'Accuracy really good today', 627, '4-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (137, 1, '2023-10-27', 'Notes', 120, 'Bullseye Only', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (226, 1, '2023-10-29', 'Buy more targets for next session', 744, '5-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (172, 1, '2023-10-29', 'Check sights, shooting left of target', 225, '3-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (138, 1, '2023-10-27', 'Range was busy today, lots of distractions', 145, 'Bullseye Only', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (185, 1, '2023-10-29', 'Notes', 506, '5-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (100, 1, '2023-10-27', 'Good game today, work on timing next time', 90, '4-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (134, 1, '2023-10-27', 'Notes', 85, '5-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (199, 1, '2023-10-29', 'Notes', 360, 'Bullseye Only', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (144, 3, '2023-10-29', 'Windy today, didn''t do so well', 100, '3-Ring', 0);
INSERT INTO public.games (game_id, user_id, game_date, game_notes, total_game_score, target_name, target_score_value) VALUES (141, 1, '2023-10-27', 'Need to buy more ammo for next time', 236, '3-Ring', 0);


--
-- Data for Name: rounds; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (166, 131, 1, 50);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (167, 131, 2, 60);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (168, 132, 1, 82);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (169, 132, 2, 108);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (172, 134, 1, 49);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (173, 134, 2, 42);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (174, 134, 3, 36);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (179, 137, 1, 50);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (180, 137, 2, 70);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (181, 138, 1, 20);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (182, 138, 2, 10);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (183, 138, 3, 0);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (279, 258, 1, 180);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (280, 258, 2, 240);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (187, 141, 1, 124);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (188, 141, 2, 72);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (189, 141, 3, 40);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (190, 144, 1, 50);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (191, 144, 2, 50);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (208, 172, 1, 27);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (209, 172, 2, 43);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (210, 172, 3, 50);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (216, 185, 1, 141);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (217, 185, 2, 226);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (218, 185, 3, 139);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (236, 199, 1, 100);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (237, 199, 2, 260);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (126, 100, 1, 0);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (127, 100, 2, 85);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (128, 100, 3, 150);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (243, 225, 1, 159);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (244, 225, 2, 143);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (245, 225, 3, 283);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (246, 226, 1, 252);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (247, 226, 2, 237);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (248, 226, 3, 135);
INSERT INTO public.rounds (round_id, game_id, round_number, round_score) VALUES (249, 226, 4, 120);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."user" (user_id, username, password, profile_picture) VALUES (1, 'Mark', '$2a$10$w7WI3a0uO9kgLrBUgSRTfOuK9m7W0TZYGEt6JYJ8h/NFf717AJiq.', NULL);
INSERT INTO public."user" (user_id, username, password, profile_picture) VALUES (3, 'John', '$2a$10$QEewUR8tUYe/77A.TFgnMO1AD1RH.lVxOyUC3a9OVaUeGfDu3aLR6', NULL);


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.games_game_id_seq', 259, true);


--
-- Name: rounds_round_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rounds_round_id_seq', 280, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_user_id_seq', 3, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: rounds rounds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rounds
    ADD CONSTRAINT rounds_pkey PRIMARY KEY (round_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: games games_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: rounds rounds_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rounds
    ADD CONSTRAINT rounds_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

