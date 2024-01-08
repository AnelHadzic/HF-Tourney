package com.hfportal.api.repository;

import com.hfportal.api.model.Team;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findByLeagueId(int leagueId, Sort sort);

}
