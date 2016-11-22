CREATE OR REPLACE FUNCTION delete_entity(id text, teams text[], user_name text) RETURNS SETOF text AS
$$
 DELETE FROM zzm_data.entity
  WHERE (((e_data -> 'id'::text)::text)) = '"'||id||'"'
    AND (
        (e_data->'team'::text)::text IS NULL
        OR REPLACE((e_data -> 'team'::text)::text, '"', '') = ANY(teams)
        OR e_created_by = user_name
    )
  RETURNING (((e_data -> 'id'::text)::text));
$$ LANGUAGE 'sql' VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_region(infrastructure_account text, region text, created_by text) RETURNS bigint AS
$$
WITH d AS (
  DELETE FROM zzm_data.entity
   WHERE (e_data->'infrastructure_account'::text)::text = '"' || infrastructure_account || '"'
     AND (e_data->'region'::text)::text = '"' || region || '"'
     AND (e_data->'created_by'::text)::text = '"' || created_by || '"'
  RETURNING (e_data->'id'::text)::text
)
SELECT count(1) FROM d

$$ LANGUAGE 'sql' VOLATILE SECURITY DEFINER;